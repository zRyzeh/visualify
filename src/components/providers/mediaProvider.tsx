import type { MediaProps } from '@definitions/media'
import { createMediaStore, type MediaStore } from '@store/mediaStore'
import { useRef } from 'react'
import { MediaContext } from '@context/mediaContext'

type MediaProviderProps = React.PropsWithChildren<MediaProps>

export const MediaProvider = ({ children, ...props }: MediaProviderProps) => {
  const storeRef = useRef<MediaStore>(null);

  if (!storeRef.current) {
    storeRef.current = createMediaStore(props)
  }

  return (
    <MediaContext.Provider value={storeRef.current} >
      {children}
    </MediaContext.Provider>
  );
}