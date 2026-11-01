import { useEffect, useRef } from "react";
import type { Route } from "./+types/contact";
import { data, Form, useNavigation } from "react-router";
import { supabase } from "~/lib/supabase.server";
import type { Profile } from "~/types/database";
import { defaultProfile } from "~/lib/default-profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact — Fikri" },
    { name: "description", content: "Get in touch with Fikri" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .single();

  return {
    profile: (profile as Profile | null) ?? defaultProfile,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const subject = formData.get("subject") as string | null;
  const message = formData.get("message") as string | null;

  // Validate fields
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return data(
      { success: false as const, error: "Semua field harus diisi." },
      { status: 400 }
    );
  }

  // Insert into contact_messages
  const { error } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  });

  if (error) {
    return data(
      { success: false as const, error: "Gagal mengirim pesan. Silakan coba lagi." },
      { status: 500 }
    );
  }

  return data({ success: true as const, error: undefined });
}

export default function Contact({ loaderData, actionData }: Route.ComponentProps) {
  const { profile } = loaderData;
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = navigation.state === "submitting";

  // Reset form after successful submission
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
    }
  }, [actionData]);

  return (
    <div>
      <section className="section">
        <div className="container-wide max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-4">Hubungi Saya</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk menghubungi saya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Info Kontak</h2>

              {profile?.email && (
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile?.social_links && (
                <div>
                  <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-3">Social Media</p>
                  <div className="flex flex-col gap-2">
                    {Object.entries(profile.social_links).map(([platform, url]) =>
                      url ? (
                        <a
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 capitalize transition-colors"
                        >
                          {platform}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              {/* Success Message */}
              {actionData?.success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-700 dark:text-green-400 font-medium">
                    ✓ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {actionData && !actionData.success && actionData.error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 font-medium">
                    ✗ {actionData.error}
                  </p>
                </div>
              )}

              <Form ref={formRef} method="post" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Subject pesan"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-y"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
