import { Gallery } from './Gallery'
import { Uploader } from './Uploader'

export default async function Images() {
  return (
    <div className="flex flex-1 flex-col gap-5 pt-4">
      <Uploader />
      <Gallery />
    </div>
  )
}
