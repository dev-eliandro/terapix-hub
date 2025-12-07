-- Update the role of the first user to 'admin'
DO $$
DECLARE
    first_user_id UUID;
BEGIN
    -- Find the id of the first user based on creation time
    SELECT id INTO first_user_id
    FROM auth.users
    ORDER BY created_at
    LIMIT 1;

    -- Check if a user role already exists and update it, otherwise insert a new role.
    -- This handles the case where the user might not have a default role for some reason.
    IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = first_user_id) THEN
        UPDATE public.user_roles
        SET role = 'admin'
        WHERE user_id = first_user_id;
    ELSE
        INSERT INTO public.user_roles (user_id, role)
        VALUES (first_user_id, 'admin');
    END IF;
END $$;
