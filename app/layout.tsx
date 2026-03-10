import "./globals.css";

export const metadata = {
  title: "Baby Meal Gen",
  description: "Generate baby meals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
