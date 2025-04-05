export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='p-1 min-h-screen flex flex-col justify-center items-center'>
      {children}
    </div>
  )
}