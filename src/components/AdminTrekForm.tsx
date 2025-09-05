import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trek } from "@/types/trek";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/ImageUpload";
import { GripVertical, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

/* ----------------------------- Zod schema ----------------------------- */

const itineraryItemSchema = z.object({
  day: z.number().min(1, "Day must be at least 1"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  date: z.string().optional().or(z.literal("")),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

const trekSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  difficulty: z.enum(["Easy", "Moderate", "Difficult", "Extreme"]),
  price: z.number().min(0, "Price must be positive"),
  max_participants: z.number().min(1, "At least 1 participant required"),
  start_date: z.string(),
  end_date: z.string(),
  location: z.string().min(2, "Location is required"),
  image_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  gallery_images: z.array(z.string()).optional(),
  highlights: z.string(),
  included: z.string(),
  excluded: z.string(),
  is_active: z.boolean(),
  itinerary: z.array(itineraryItemSchema).min(1, "Add at least one day to the itinerary"),
});

type TrekFormData = z.infer<typeof trekSchema>;

interface AdminTrekFormProps {
  trek?: Trek;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

/* ------------------------------ Component ----------------------------- */

const AdminTrekForm = ({ trek, onSubmitSuccess, onCancel }: AdminTrekFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string[]>(trek?.image_url ? [trek.image_url] : []);
  const [galleryImages, setGalleryImages] = useState<string[]>(trek?.gallery_images || []);

  const form = useForm<TrekFormData>({
    resolver: zodResolver(trekSchema),
    defaultValues: {
      title: trek?.title || "",
      description: trek?.description || "",
      duration: trek?.duration || 1,
      difficulty: trek?.difficulty || "Easy",
      price: trek?.price || 0,
      max_participants: trek?.max_participants || 1,
      start_date: trek?.start_date || "",
      end_date: trek?.end_date || "",
      location: trek?.location || "",
      image_url: trek?.image_url || "",
      gallery_images: trek?.gallery_images || [],
      highlights: trek?.highlights?.join(", ") || "",
      included: trek?.included?.join(", ") || "",
      excluded: trek?.excluded?.join(", ") || "",
      is_active: trek?.is_active ?? true,
      itinerary: trek?.itinerary && Array.isArray(trek.itinerary) && trek.itinerary.length > 0
        ? trek.itinerary.map((d: any, idx: number) => ({
            day: Number(d.day ?? idx + 1),
            title: String(d.title ?? ""),
            date: d.date ?? "",
            description: String(d.description ?? ""),
          }))
        : [
            { day: 1, title: "", date: "", description: "" },
          ],
    },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "itinerary",
  });

  // Optional: auto-sync day numbers when list changes
  const syncDayNumbers = () => {
    const items = watch("itinerary");
    items.forEach((_, i) => setValue(`itinerary.${i}.day`, i + 1, { shouldDirty: true, shouldValidate: true }));
  };

  const onSubmit = async (data: TrekFormData) => {
    setIsSubmitting(true);
    try {
      const trekData = {
        title: data.title,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
        price: data.price,
        max_participants: data.max_participants,
        start_date: data.start_date,
        end_date: data.end_date,
        location: data.location,
        image_url: mainImage[0] || "",
        gallery_images: galleryImages,
        highlights: data.highlights.split(",").map((h) => h.trim()).filter((h) => h),
        included: data.included.split(",").map((i) => i.trim()).filter((i) => i),
        excluded: data.excluded.split(",").map((e) => e.trim()).filter((e) => e),
        itinerary: data.itinerary.map((d) => ({
          day: d.day,
          title: d.title.trim(),
          date: d.date || null,
          description: d.description.trim(),
        })), // array of objects ready for JSON column
        is_active: data.is_active,
      };

      if (trek) {
        const { error } = await supabase.from("treks").update(trekData).eq("id", trek.id);
        if (error) throw error;
        toast.success("Trek updated successfully!");
      } else {
        const { error } = await supabase.from("treks").insert(trekData);
        if (error) throw error;
        toast.success("Trek created successfully!");
      }

      onSubmitSuccess();
    } catch (error) {
      console.error("Trek form error:", error);
      toast.error("Failed to save trek. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{trek ? "Edit Trek" : "Add New Trek"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Trek title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nepal, Himalayas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Trek description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Difficult">Difficult</SelectItem>
                        <SelectItem value="Extreme">Extreme</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="max_participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Participants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <ImageUpload
              images={mainImage}
              onImagesChange={setMainImage}
              label="Main Trek Image"
              multiple={false}
            />

            <ImageUpload
              images={galleryImages}
              onImagesChange={setGalleryImages}
              label="Gallery Images"
              multiple
            />

            <FormField
              control={control}
              name="highlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlights (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mountain views, Cultural experience, Wildlife..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="included"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Included (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Guide, Meals, Accommodation..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="excluded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excluded (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Flights, Insurance, Personal gear..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------- Itinerary section ------------------------- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Itinerary</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    append({ day: fields.length + 1, title: "", date: "", description: "" });
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Day
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border p-3 md:p-4 space-y-3 bg-muted/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <GripVertical className="h-4 w-4" />
                        Day {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              swap(index, index - 1);
                              setTimeout(syncDayNumbers, 0);
                            }}
                            title="Move up"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                        )}
                        {index < fields.length - 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              swap(index, index + 1);
                              setTimeout(syncDayNumbers, 0);
                            }}
                            title="Move down"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            remove(index);
                            setTimeout(syncDayNumbers, 0);
                          }}
                          title="Remove day"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <FormField
                        control={control}
                        name={`itinerary.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Arrival, Acclimatization, Summit push..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`itinerary.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date (optional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`itinerary.${index}.day`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={control}
                      name={`itinerary.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Details</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe activities, altitude, distance, notes..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Active Trek</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : trek ? "Update Trek" : "Create Trek"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminTrekForm;
