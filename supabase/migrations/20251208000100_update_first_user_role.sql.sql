-- Update the role of the user 'Eliandro' to 'admin'
DO $$
DECLARE
    eliandro_user_id UUID;
BEGIN
    -- Find the id of the user 'Eliandro'
    SELECT user_id INTO eliandro_user_id
    FROM public.profiles
    WHERE full_name = 'Eliandro'
    LIMIT 1;

    -- If the user is found, update their role
    IF eliandro_user_id IS NOT NULL THEN
        -- Check if a user role already exists and update it, otherwise insert a new role.
        IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = eliandro_user_id) THEN
            UPDATE public.user_roles
            SET role = 'admin'
            WHERE user_id = eliandro_user_id;
        ELSE
            INSERT INTO public.user_roles (user_id, role)
            VALUES (eliandro_user_id, 'admin');
        END IF;
    END IF;
END $$;