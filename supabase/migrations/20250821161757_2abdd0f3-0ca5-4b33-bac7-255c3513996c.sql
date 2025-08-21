-- Allow users to update their own comments and admins to update any comment
CREATE POLICY "Users can update their own comments" 
ON public.blog_article_comments 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  ))
);

-- Allow users to delete their own comments and admins to delete any comment
CREATE POLICY "Users can delete their own comments and admins can delete any" 
ON public.blog_article_comments 
FOR DELETE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  ))
);