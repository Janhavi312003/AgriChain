export async function uploadToIPFS(file: File): Promise<string> {
  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT

  if (!JWT) {
    throw new Error('Pinata JWT not configured')
  }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: file.name,
    })
    formData.append('pinataMetadata', metadata)

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    })

    const data = await response.json()
    return data.IpfsHash
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw error
  }
}

export function getIPFSUrl(hash: string): string {
  const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud'
  return `https://${gateway}/ipfs/${hash}`
}
