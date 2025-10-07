interface IResponsiveIframeProps {
  sourceUrl: string,
}

function ResponsiveIframe({ sourceUrl }: IResponsiveIframeProps) {
  return (
    <div className="relative aspect-[6/3]">
      <iframe
        src={sourceUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full top-0 left-0"
      ></iframe>
    </div>
  );
}

export default ResponsiveIframe;