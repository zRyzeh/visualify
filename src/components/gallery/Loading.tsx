export const Loading = () => {
  return (
    <>
      <div className="flex gap-10 w-full items-center justify-center p-8">
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full"></div>
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full delay-200"></div>
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full delay-400"></div>
      </div>
    </>
  )
}