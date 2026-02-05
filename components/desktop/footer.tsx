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

export default function FooterDesktop() {
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    getSettings().then(data => setSettings(data))
  }, [])

  return (
    <div
      className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10 mb-28"
      id="footer"
    >
      <div className="col-span-4 col-start-3 flex justify-between items-center">
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
      <div className="col-span-4 col-start-7 grid md:grid-cols-3 grid-cols-4 gap-5">
        {/* Texto */}
        <div className="col-span-1 md:col-start-1 lg:col-start-2 flex items-center">
          <p className="font-family-souvenir text-luisa-pink font-bold uppercase leading-4 text-xs xl:text-base">
            spreading
            <br />
            <span className="lowercase italic font-medium">the</span> noise
          </p>
        </div>
        {/* SVGs */}
        <div className="col-span-3 md:col-start-2 lg:col-start-3 flex items-center justify-between">
          <FooterSvg1 className="max-w-8 h-auto" />
          <FooterSvg2 className="max-w-8 h-auto" />
          <FooterSvg3 className="max-w-8 h-auto" />
        </div>
      </div>
    </div>
  )
}
