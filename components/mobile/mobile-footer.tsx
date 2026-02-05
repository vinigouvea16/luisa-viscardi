'use client'

import { getSettings } from '@/lib/firebase/settings'
import type { Settings } from '@/types/admin'
import { useEffect, useState } from 'react'
import FooterSvg1 from '../svgs/pink-svgs/footer/footer-svg1'
import FooterSvg2 from '../svgs/pink-svgs/footer/footer-svg2'
import FooterSvg3 from '../svgs/pink-svgs/footer/footer-svg3'
import FacebookSvg from '../svgs/socials/facebook'
import InstagramSvg from '../svgs/socials/instagram'
import SoundCloudSvg from '../svgs/socials/soundcloud'
import SpotifySvg from '../svgs/socials/spotify'
import TikTokSvg from '../svgs/socials/tiktok'
import YouTubeSvg from '../svgs/socials/youtube'

export default function FooterMobile() {
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    getSettings().then(data => setSettings(data))
  }, [])

  return (
    <div className="flex flex-col gap-8 px-14.25 mb-20" id="footer">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          {settings.instagramUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.instagramUrl}
              aria-label="Link to Instagram"
            >
              <InstagramSvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="Instagram (não configurado)"
            >
              <InstagramSvg />
            </div>
          )}
          {settings.tiktokUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.tiktokUrl}
              aria-label="Link to TikTok"
            >
              <TikTokSvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="TikTok (não configurado)"
            >
              <TikTokSvg />
            </div>
          )}
          {settings.soundcloudUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.soundcloudUrl}
              aria-label="Link to SoundCloud"
            >
              <SoundCloudSvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="SoundCloud (não configurado)"
            >
              <SoundCloudSvg />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          {settings.spotifyUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.spotifyUrl}
              aria-label="Link to Spotify"
            >
              <SpotifySvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="Spotify (não configurado)"
            >
              <SpotifySvg />
            </div>
          )}
          {settings.facebookUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.facebookUrl}
              aria-label="Link to Facebook"
            >
              <FacebookSvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="Facebook (não configurado)"
            >
              <FacebookSvg />
            </div>
          )}
          {settings.youtubeUrl ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={settings.youtubeUrl}
              aria-label="Link to YouTube"
            >
              <YouTubeSvg />
            </a>
          ) : (
            <div
              className="opacity-65 cursor-not-allowed"
              aria-label="YouTube (não configurado)"
            >
              <YouTubeSvg />
            </div>
          )}
        </div>
      </div>
      <p className="font-family-souvenir font-bold text-center mx-auto text-luisa-pink uppercase tracking-tight leading-tight">
        spreading <br />
        <span className="italic lowercase font-medium">the</span> noise
      </p>
      <div className="flex items-center justify-between w-3/4 mx-auto">
        <FooterSvg1 className="max-w-9" />
        <FooterSvg2 className="max-w-9" />
        <FooterSvg3 className="max-w-9" />
      </div>
    </div>
  )
}
