import Navbar from "../components/Navbar";
import { getDictionary } from "../dictionaries";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export default async function LangLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      {children}
    </>
  );
}
