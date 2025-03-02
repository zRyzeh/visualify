export const Loader = () => {
  return (
    <>
      <div className="flex gap-10 w-full items-center justify-center p-10">
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full"></div>
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full" style={{ animationDelay: "200ms" }}></div>
        <div className="animate-load bg-gray-400 h-6 w-6 rounded-full" style={{ animationDelay: "400ms" }}></div>
      </div>
    </>
  )
}