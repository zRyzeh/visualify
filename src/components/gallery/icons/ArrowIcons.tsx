interface Icon {
  className?: string
}

export const Arrow = ({ className }: Icon) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="15" height="15" viewBox="0 0 15 15"><path fill="white" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" /></svg>
  )
}