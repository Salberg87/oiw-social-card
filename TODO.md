# OIW Social Card Generator - TODO List

## User Interface Improvements

### Form Interactions
- [] Fix placeholder text behavior
  - [] Add placeholder text on user click
  - [] Implement proper form field states (focus, max length, filled, error)
  - [] Add visual feedback for active fields

### Image Preview
- [ ] Lock preview image to 1:1 aspect ratio
  - Implement fixed aspect ratio container
  - Ensure consistent display across all screen sizes
  - Add proper image scaling and centering

### Layout Adjustments
- [ ] Adjust preview container (gray box)
  - Review and update padding/margins
  - Ensure consistent spacing
  - Optimize for different screen sizes

## New Features

### Terms & Conditions
- [ ] Add Terms & Conditions section
  - Create Terms & Conditions content
  - Implement acceptance checkbox
  - Add link to full T&C document
  - Validate acceptance before submission

### Newsletter Integration
- [ ] Add newsletter signup functionality
  - Add checkbox for newsletter opt-in
  - Design newsletter confirmation email
  - Implement email validation
  - Add to user preferences in database

## Backend Integration

### Supabase Database
- [ ] Create database schema for:
  - User information
  - Generated images
  - Newsletter preferences
  - Terms acceptance

### Data Storage Implementation
- [ ] Set up Supabase tables for:
  - Users
    - Name
    - Email
    - Newsletter preference
    - Terms acceptance timestamp
  - Generated Cards
    - Image URL
    - Creation timestamp
    - User reference
    - Background used
    - Profile image URL

### API Integration
- [ ] Implement Supabase API calls for:
  - Saving user data
  - Storing generated images
  - Managing newsletter subscriptions
  - Tracking terms acceptance

## Testing & Validation
- [ ] Test form validation
- [ ] Verify image aspect ratio across devices
- [ ] Test database operations
- [ ] Validate newsletter signup flow
- [ ] Check terms & conditions integration

## Documentation
- [ ] Update README with new features
- [ ] Document database schema
- [ ] Add API documentation
- [ ] Update user guide 