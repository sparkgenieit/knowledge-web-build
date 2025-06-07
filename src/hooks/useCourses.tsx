
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name),
          profiles (full_name),
          reviews (rating)
        `)
        .eq('status', 'published');

      if (error) throw error;

      // Calculate average rating and reviews count for each course
      return data.map(course => ({
        ...course,
        instructor: course.profiles?.full_name || 'Unknown',
        category: course.categories?.name || 'Unknown',
        rating: course.reviews?.length 
          ? course.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / course.reviews.length 
          : 0,
        reviewsCount: course.reviews?.length || 0,
        studentsCount: 0 // Will be updated with enrollments count later
      }));
    }
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (name),
          profiles (full_name, avatar_url, bio),
          lessons (id, title, description, duration_minutes, order_index),
          reviews (rating, comment, profiles(full_name, avatar_url))
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Get enrollment count
      const { count: enrollmentCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', id);

      return {
        ...data,
        instructor: data.profiles?.full_name || 'Unknown',
        instructorAvatar: data.profiles?.avatar_url,
        instructorBio: data.profiles?.bio,
        category: data.categories?.name || 'Unknown',
        studentsCount: enrollmentCount || 0,
        rating: data.reviews?.length 
          ? data.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / data.reviews.length 
          : 0,
        reviewsCount: data.reviews?.length || 0,
        lessons: data.lessons?.sort((a: any, b: any) => a.order_index - b.order_index) || []
      };
    },
    enabled: !!id
  });
};
