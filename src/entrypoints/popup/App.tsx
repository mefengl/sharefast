import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

function Popup() {
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')
  const [showAbout, setShowAbout] = useState(false)

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

  const handleShare = ({ includeLink } = { includeLink: false }) => {
    let tweetText = comment
    if (includeLink) {
      tweetText += `\n${url}`
    }
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
  }

  if (showAbout) {
    return (
      <div className="w-80 p-4">
        <h2 className="mb-4 text-lg font-bold">About</h2>
        <div className="mb-4 text-sm text-gray-700">
          Made by
          {' '}
          <a className="underline" href="https://x.com/mefengl" rel="noopener noreferrer" target="_blank">Alan</a>
          {' '}
          😎
        </div>
        <div className="mb-4 text-xs text-gray-500">
          Credits:
          <br />
          Logo based on `streamline:twitter-solid` from
          {' '}
          <a className="underline" href="http://streamlinehq.com" rel="noopener noreferrer" target="_blank">Streamline</a>
          , licensed under the
          {' '}
          <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" rel="noopener noreferrer" target="_blank">CC BY 4.0</a>
          {' '}
          license.
        </div>
        <Button
          className="w-full"
          onClick={() => setShowAbout(false)}
          size="sm"
        >
          Back to Share
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 p-4 pb-0">
      <Textarea
        autoFocus
        className="mb-2"
        onChange={e => setComment(e.target.value)}
        placeholder="Add your comment here..."
        value={comment}
      />
      <div className="mb-4">
        <strong>Current URL:</strong>
        {' '}
        {url}
      </div>
      <Button className="mb-2 w-full" onClick={() => handleShare({ includeLink: true })}>
        Share to Twitter
      </Button>
      <Button
        className="mb-2 w-full"
        onClick={() => handleShare()}
        variant="ghost"
      >
        Send without link
      </Button>
      <Button
        className="w-full"
        onClick={() => setShowAbout(true)}
        size="sm"
        variant="link"
      >
        About
      </Button>
    </div>
  )
}

export default Popup
