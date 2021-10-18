import { useSelector } from "../base";

export default function About() {
  // Dark Theme Redux State
  const darkTheme = useSelector((state) => state.changeTheme);
  // Style Redux State
  const style = useSelector((state) => state.changeStyle);

  // Accrodion Item Style
  const accordionItemStyle = {
    ...style,
    borderRight: darkTheme ? "1px solid white" : "",
    borderLeft: darkTheme ? "1px solid white" : "",
    borderTop: darkTheme ? "1px solid white" : "",
  };

  // Accordion Data Array
  const accordionData = [
    ["Open Source", "Quizify's Code is available on github :  @ManasMadan"],
    [
      "Free To Use",
      "Quizify is Free To Use Without any Monthly Charges at any time",
    ],
    [
      "Browser Compatible",
      "Quizify works in any web browsers such as Chrome, Firefox,Internet Explorer, Safari, Opera.",
    ],
  ];
  return (
    <div className="container my-5">
      <h2>About Quizify</h2>
      <div className="accordion" id="accordionExample">
        {accordionData.map(([title, description], i) => (
          <div className="accordion-item" style={accordionItemStyle}>
            <h2 className="accordion-header" id={`heading${i}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${i}`}
                aria-expanded="false"
                aria-controls={`collapse${i}`}
                style={accordionItemStyle}
              >
                {title}
              </button>
            </h2>
            <div
              id={`collapse${i}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${i}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
