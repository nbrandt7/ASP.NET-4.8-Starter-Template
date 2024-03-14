const VisualNav = ({
  visualNavItems,
  url,
  imageSrc,
  imageAlt,
  htmlContent,
  hasDescription,
}) => {
  return (
    <div
      className={`visual-nav col-max-${visualNavItems.length} services-nav single-row`}
    >
      {visualNavItems.map((item, index) => (
        <React.Fragment key={index}>
          {url ? (
            <a
              href={url}
              title=""
              className="nav-item js-visual-nav-item has-url"
            >
              <img
                className="cover-img-bg"
                src={`${imageSrc}?width=590&height=490&mode=max`}
                alt={imageAlt}
                title=""
              />
              <div className="content-contain js-nav-item-content">
                {htmlContent}
              </div>
            </a>
          ) : (
            <div
              className={`nav-item js-visual-nav-item span-row${
                hasDescription ? " has-description" : ""
              }`}
            >
              <img
                className="cover-img-bg"
                src={imageSrc}
                alt={imageAlt}
                title=""
              />
              <div className="content-contain js-nav-item-content">
                {htmlContent}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VisualNav;

{
  /* <VisualNav
    visualNavItems={visualNavItems}
    url={url}
    imageSrc={imageSrc}
    imageAlt={imageAlt}
    htmlContent={htmlContent}
    hasDescription={hasDescription}
/> */
}
