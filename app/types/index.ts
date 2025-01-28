/**
 * Core state interface for the Oslo Innovation Week social card generator.
 * This interface defines all the properties needed to generate a personalized social card.
 */
export interface ImageGeneratorState {
    /** User's first name - displayed prominently on the card */
    firstName: string;

    /** User's last name - currently not displayed but reserved for future use */
    lastName: string;

    /** User's professional title or role */
    title: string;

    /** Original uploaded profile image file before cropping */
    profileImage: File | null;

    /** URL of the cropped profile image ready for display */
    croppedProfileImage: string | null;

    /** Array of discussion topics the user is interested in */
    topics: string[];

    /** URL of the current background image from Supabase storage or local fallback */
    backgroundImage: string;

    /** URL of the current logo image from Supabase storage or local fallback */
    logoImage: string;
} 