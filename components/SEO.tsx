import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Digital Islam | Empowering Communities Through Knowledge and Compassion",
    description = "Digital Islam is a faith-based digital platform dedicated to educating, inspiring, and uplifting communities through Islamic knowledge, charity, and creative engagement in Sierra Leone and beyond.",
    keywords = "Digital Islam, Islamic education, charity, Sierra Leone, Muslim community, faith-based platform, Islamic knowledge, compassion, community empowerment",
    ogImage = "https://digitalislamsl.org/logo.jpg",
    ogUrl = "https://digitalislamsl.org"
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={ogUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;
