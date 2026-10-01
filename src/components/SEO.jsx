import { useEffect } from 'react';

const SEO = ({
  title,
  description = 'ADHHESI PRO - Har Joint Mein Pro Strength. Authorized commercial supplier and showcase for genuine Fevicol adhesives including Fevicol SH, Fevicol Marine, Fevicol HeatX, Fevicol Probond, and Fevicol Hi-Per.',
  keywords = 'Fevicol, Fevicol SH, Fevicol Marine, Fevicol HeatX, Fevicol Probond, Fevicol Hi-Per, Fevicol Ezee Spray, Pidilite, synthetic resin adhesive, waterproof wood glue, contact adhesive, Adhhesi Pro',
  canonical = window.location.href,
}) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ADHHESI PRO - Genuine Fevicol Solutions`
      : 'ADHHESI PRO | Genuine Fevicol Adhesives - Har Joint Mein Pro Strength';

    document.title = fullTitle;

    const setMetaTag = (attrName, attrVal, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', `${window.location.origin}/logo.jpg`);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;
