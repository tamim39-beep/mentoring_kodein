import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser } from "@/utils/api/users";

const addUserSchema = z.object({
  fullname: z
    .string()
    .min(8, { message: "Nama Lengkap harus minimal 8 karakter" }),
  username: z.string().min(5, { message: "Username harus minimal 5 karakter" }),
  password: z.string().min(5, { message: "Password harus minimal 5 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phone_number: z
    .string()
    .refine((val) => !isNaN(val), "Nomor telepon harus berupa angka")
    .transform((val) => Number(val)),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val))
    .refine((val) => val >= 18 && val <= 60, {
      message: "Umur harus antara 18 - 60 tahun",
    }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter" }),
  role: z.enum(["user", "admin"], { message: "Role tidak valid" }),
});

function AddUser() {
  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone_number: 0,
      age: 0,
      address: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const message = await addUser(data);
      alert("User berhasil ditambahkan: " + message);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Gagal menambahkan user.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Tambah User Baru
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Nama Lengkap */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Nama Lengkap"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Username"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan Password"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Email"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Nomor Telepon */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Nomor Telepon
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Nomor Telepon"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Umur */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">Umur</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Umur"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Alamat */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium">
                    Alamat
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Alamat"
                      {...field}
                      className="border border-gray-400 text-black bg-white focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Tombol Submit */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddUser;
