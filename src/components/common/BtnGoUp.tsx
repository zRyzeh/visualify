import { Arrow } from "@components/gallery/icons/ArrowIcons";

export const BtnGoUp = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-green-light p-3 rounded-full w-fit h-fit mb-4 cursor-pointer">
      <Arrow className="-rotate-90 h-10 w-10" />
    </button>
  )
}
