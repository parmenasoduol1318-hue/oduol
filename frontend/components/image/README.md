# Image Components

This folder contains all reusable image-related components used throughout the SwiftReply application.

---

## Components

### ImageGenerator.tsx
Provides the complete AI image generation workflow by combining the prompt input and image preview components.

---

### ImagePrompt.tsx
Reusable prompt input component where users describe the image they want the AI to generate.

Features:

- Multi-line prompt input
- Prompt validation
- Generate button
- Loading state

---

### ImagePreview.tsx
Displays the generated AI image.

Features:

- Loading indicator
- Empty state
- Prompt display
- Image actions

---

### ImageActions.tsx
Reusable action buttons for generated images.

Supported actions:

- Download
- Share
- Copy prompt
- Open image
- Regenerate
- Delete

---

### ImageUploader.tsx
Allows users to upload an image from their gallery or capture a new one using the camera.

Uses:

- Image editing
- Vision AI
- OCR
- Profile pictures

---

### ImageCard.tsx
Displays an individual generated image.

Shows:

- Image thumbnail
- Prompt
- Creation date
- Delete button

---

### ImageGallery.tsx
Displays multiple generated images in a scrollable list.

Used for:

- Generated image history
- Favorites
- Saved images

---

### ImageHistory.tsx
Displays a user's previously generated images.

Supports:

- Loading state
- Empty state
- Image selection
- Delete actions

---

### ImageViewer.tsx
Full-screen image viewer.

Supports:

- Full-screen preview
- Prompt display
- Image actions
- Download
- Share
- Delete
- Regenerate

---

# Folder Structure

```text
components/image
│
├── ImageActions.tsx
├── ImageCard.tsx
├── ImageGallery.tsx
├── ImageGenerator.tsx
├── ImageHistory.tsx
├── ImagePreview.tsx
├── ImagePrompt.tsx
├── ImageUploader.tsx
├── ImageViewer.tsx
└── README.md
```

---

# Dependencies

These components rely on:

- `components/common`
  - AppButton
  - AppInput

- `services/image/imageService`

- `constants/colors`

- `expo-image-picker`

- `expo-clipboard`

- `expo-linking`

- `expo-router`

---

# Future Improvements

Planned enhancements include:

- AI image editing
- Background removal
- Inpainting
- Outpainting
- Image variations
- HD upscaling
- Watermark removal
- Batch image generation
- Image collections
- Favorites
- Cloud synchronization
- Offline cache
- Image search
- Prompt templates
- Prompt history
- Vision AI integration
- OCR support
- Face restoration
- Image compression
- EXIF metadata viewer

---

# Notes

These components are designed to be modular and reusable. Business logic such as API requests, downloads, uploads, and persistence should remain in the corresponding service layer (`services/image`) while UI components focus on presentation and user interaction.