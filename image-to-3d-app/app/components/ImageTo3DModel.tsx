import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

// Type definitions
interface UploadResponse {
  code: number
  data: {
    image_token: string
  }
}

interface ConvertResponse {
  code: number
  data: {
    task_id: string
    status: string
  }
}

export default function ImageTo3DModel() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageToken, setImageToken] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [taskID, setTaskID] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or WebP)')
        return
      }

      const MAX_SIZE = 10 * 1024 * 1024
      if (file.size > MAX_SIZE) {
        setError('Image size must be less than 10MB')
        return
      }

      setSelectedImage(file)
      setImageToken(null)
      setError(null)
      setSuccess(null)
    }
  }

  const uploadImage = async () => {
    if (!selectedImage) return

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedImage)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const data = await response.json() as UploadResponse

      if (data.code !== 0 || !data.data?.image_token) {
        throw new Error('Invalid response from server')
      }

      setImageToken(data.data.image_token)
      setSuccess('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }
  const fetchTask = async () => {
    console.log('Task ID:', taskID);
    setError(null);
    setSuccess(null);

    try {
      if (!taskID) {
        setError('Task ID is required');
        throw new Error('Task ID is required');
      }
      const response = await fetch('/api/fetch-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskID }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch task: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.code !== 0) {
        throw new Error('Failed to retrieve task status');
      }
      if (data.data.status === 'running') {
        throw new Error('Task is still running please wait and try again in a couple of seconds');
      }
      setSuccess(`Task fetched successfully. Status: ${data.data.status}`);
      window.location.href = `${data.data.output.model}`;
      console.log('Task Data:', data);
    } catch (error) {
      console.error('Fetch task error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch task');
    }
  };
  const convertTo3D = async () => {
    if (!imageToken) return

    setIsConverting(true)
    setError(null)
    setSuccess(null)
    try {
      const convertData = {
        type: "image_to_model",
        file: {
          type: selectedImage?.type.split('/')[1] || 'jpeg',
          file_token: imageToken,
        },
      }

      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertData),
      })

      if (!response.ok) {
        throw new Error(`Conversion failed: ${response.statusText}`)
      }

      const result = await response.json() as ConvertResponse

      if (result.code !== 0) {
        throw new Error('Conversion failed')
      }

      setSuccess(`Conversion started successfully. Task ID: ${result.data.task_id}`)
      setTaskID(result.data.task_id)
    } catch (error) {
      console.error('Conversion error:', error)
      setError(error instanceof Error ? error.message : 'Failed to convert image')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center gap-4 px-6">
            <h1 className="text-xl text-foreground">Image to 3D</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Upload and Convert Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center justify-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer"
                >
                  {selectedImage ? (
                    <div className="relative h-64 w-64 overflow-hidden rounded-lg">
                      <Image
                      height={64}
                      width={64}
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="h-full w-full object-cover"
                        onLoad={() => {
                          URL.revokeObjectURL(URL.createObjectURL(selectedImage))
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground hover:border-primary transition-colors">
                      <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Choose an image or drop it here</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Supported formats: JPEG, PNG, WebP. Maximum size: 10MB
                </p>
              </div>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button
                className="w-1/2"
                disabled={!selectedImage || isUploading}
                onClick={uploadImage}
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <Button
                className="w-1/2"
                disabled={!imageToken || isConverting}
                onClick={convertTo3D}
              >
                {isConverting ? 'Converting...' : 'Convert to 3D'}
              </Button>
              <Button className='w-1/3'
                disabled={isUploading || isConverting || !imageToken}
                onClick={fetchTask}>
                Fetch Task
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}