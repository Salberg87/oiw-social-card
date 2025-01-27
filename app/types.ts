export interface ImageGeneratorState {
  firstName: string
  lastName: string
  title: string
  profileImage: File | null
  croppedProfileImage: string | null
  topics: string[]
  backgroundImage: string
}

export interface CropperState {
  aspect: number
  x: number
  y: number
  width: number
  height: number
  unit: "px" | "%"
}

