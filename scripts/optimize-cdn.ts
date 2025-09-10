import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// CDN configuration settings
const CDN_CONFIG = {
    CACHE_CONTROL: {
        BACKGROUNDS: 60 * 60 * 24 * 7, // 7 days for backgrounds
        LOGOS: 60 * 60 * 24 * 7,       // 7 days for logos
    },
    TRANSFORM_OPTIONS: {
        ALLOWED_FORMATS: ['webp', 'png'],
        DEFAULT_QUALITY: 80,
    }
}

// Buckets to configure
const BUCKETS = ['backgrounds', 'logos']

/**
 * Optimize bucket settings for CDN usage
 */
async function optimizeBucketForCDN(bucket: string) {
    try {
        console.log(`Optimizing ${bucket} bucket for CDN usage...`)

        // Update bucket settings
        const { error } = await supabase.storage.updateBucket(bucket, {
            public: true, // Make bucket public for CDN access
            fileSizeLimit: 5242880, // 5MB limit
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
        })

        if (error) {
            console.error(`Error updating ${bucket} bucket:`, error)
            return
        }

        console.log(`✅ Successfully optimized ${bucket} bucket for CDN usage`)

        // Get list of files to update their cache-control headers
        const { data: files, error: listError } = await supabase.storage
            .from(bucket)
            .list()

        if (listError) {
            console.error(`Error listing files in ${bucket} bucket:`, listError)
            return
        }

        if (!files || files.length === 0) {
            console.log(`No files found in ${bucket} bucket`)
            return
        }

        console.log(`Found ${files.length} files in ${bucket} bucket`)

        // Determine cache duration based on bucket type
        const cacheDuration = bucket === 'backgrounds'
            ? CDN_CONFIG.CACHE_CONTROL.BACKGROUNDS
            : CDN_CONFIG.CACHE_CONTROL.LOGOS

        // Update each file with cache-control headers
        for (const file of files) {
            if (!file.name.endsWith('.png')) continue

            try {
                // We need to download and re-upload the file to update its cache-control headers
                const { data: fileData, error: downloadError } = await supabase.storage
                    .from(bucket)
                    .download(file.name)

                if (downloadError || !fileData) {
                    console.error(`Error downloading ${file.name}:`, downloadError)
                    continue
                }

                // Re-upload with cache-control headers
                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(file.name, fileData, {
                        cacheControl: `max-age=${cacheDuration}, public`,
                        contentType: 'image/png',
                        upsert: true
                    })

                if (uploadError) {
                    console.error(`Error updating ${file.name}:`, uploadError)
                    continue
                }

                console.log(`✅ Updated cache-control for ${file.name}`)
            } catch (err) {
                console.error(`Error processing ${file.name}:`, err)
            }
        }

        console.log(`✅ Completed optimization for ${bucket} bucket`)
    } catch (err) {
        console.error(`Error optimizing ${bucket} bucket:`, err)
    }
}

/**
 * Main function to run the optimization process
 */
async function main() {
    console.log('Starting CDN optimization for Supabase buckets...')

    // Process each bucket
    for (const bucket of BUCKETS) {
        await optimizeBucketForCDN(bucket)
    }

    console.log('CDN optimization completed!')
}

// Run the main function
main()
    .catch(err => {
        console.error('Error in optimization process:', err)
        process.exit(1)
    }) 