/**
 * Core state interface for the Oslo Innovation Week social card generator.
 * This interface defines all the properties needed to generate a personalized social card.
 */
export interface ImageGeneratorState {
    /** Original uploaded profile image file before cropping */
    profileImage: File | null;

    /** URL of the cropped profile image ready for display */
    croppedProfileImage: string | null;

    /** The discussion topic the user is interested in */
    topic: string;

    /** URL of the current background image from local assets */
    backgroundImage: string;

    /** URL of the current logo image from local assets */
    logoImage: string;
} 