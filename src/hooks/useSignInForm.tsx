import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signInService } from "@/shared/services/signInService";

const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export const useSignInForm = () => {
  const signInMutation = useMutation({
    mutationFn: signInService,
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value);
    },
  });

  return { form, signInMutation };
};

export const SignInForm = () => {
  const { form, signInMutation } = useSignInForm();

  <form
    onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }}
  >
    <form.Field name="email">
      {(field) => (
        <>
          <input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
          {field.state.meta.errors?.join(",")}
        </>
      )}
    </form.Field>

    <form.Field name="password">
      {(field) => (
        <input
          type="password"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
    </form.Field>

    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button type="submit" disabled={!canSubmit}>
          {isSubmitting || signInMutation.isPending ? "..." : "Login"}
        </button>
      )}
    </form.Subscribe>
  </form>;
};
