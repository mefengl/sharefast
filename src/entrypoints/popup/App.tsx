import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function Popup() {
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    const getActiveTabUrl = async () => {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
      if (tab?.url) {
        let formattedUrl = tab.url
        if (formattedUrl.endsWith('/')) {
          formattedUrl = formattedUrl.slice(0, -1)
        }
        setUrl(formattedUrl)
      }
    }
    getActiveTabUrl()
  }, [])

  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(comment)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <div className="w-80 p-4">
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Add your comment here..."
        className="mb-2"
      />
      <div className="mb-4">
        <strong>Current URL:</strong>
        {' '}
        {url}
      </div>
      <Button onClick={handleShare} className="w-full">
        Share to Twitter
      </Button>
    </div>
  )
}

export default Popup
