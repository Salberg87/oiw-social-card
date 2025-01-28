// Define the core state interface for the image generator
export interface ImageGeneratorState {
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** User's professional title */
    title: string;
    /** Original uploaded profile image file */
    profileImage: File | null;
    /** Cropped profile image URL */
    croppedProfileImage: string | null;
    /** Array of discussion topics */
    topics: string[];
    /** Current background image URL */
    backgroundImage: string;
    /** Current logo image URL */
    logoImage: string;
} 