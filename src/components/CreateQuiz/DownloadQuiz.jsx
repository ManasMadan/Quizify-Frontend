import jsPDF from "jspdf";
import {
  html2canvas,
  useEffect,
  useDispatch,
  setAlert,
  setLoading,
  useSelector,
} from "../../base";

export default function DownloadQuiz(props) {
  const { edit, setEdit, questions, quizcode } = props;
  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit.type === "none") {
      return;
    }

    switch (edit.type) {
      case "image":
        downloadImage(false);
        break;
      case "pdf":
        downloadQuizPdf(false);
        break;
      default:
        break;
    }
  }, [edit.value]);

  // Download Quiz - Image
  const downloadImageHandler = (answers) => {
    if (questions.length === 0) {
      dispatch(setAlert({ type: "Danger", message: "Atleast Add A Question" }));
      return;
    }

    dispatch(setLoading(true));
    if (answers) {
      const questionActions =
        document.getElementsByClassName("questionActions");
      for (let i = 0; i < questionActions.length; i++) {
        const element = questionActions[i];
        element.classList.add("d-none");
      }

      downloadImage(true);
    } else {
      setEdit({ value: false, type: "image" });
    }
  };
  const downloadImage = (answers) => {
    const input = document.getElementById("questionsDiv");
    input.insertAdjacentHTML(
      "afterbegin",
      `<span style="color: black;">Quiz Made Using Quizify<br>To Attempt Its Interactive Version, Go To ${process.env.REACT_APP_URL} and Enter The Code ${quizcode}</span>`
    );
    html2canvas(input).then((canvas) => {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      saveBase64AsFile(
        imgData,
        `${quizcode}-Questions${answers ? "-Answers" : ""}`
      );
      input.removeChild(input.children[0]);
      if (!answers) {
        setEdit({ value: true, type: "none" });
      } else {
        const questionActions =
          document.getElementsByClassName("questionActions");
        for (let i = 0; i < questionActions.length; i++) {
          const element = questionActions[i];
          element.classList.remove("d-none");
        }
      }
      dispatch(
        setAlert({ type: "Success", message: "Downloaded Successfully" })
      );
      dispatch(setLoading(false));
    });
  };

  // Save Base64 to disk
  function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");
    document.body.appendChild(link); // for Firefox
    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }

  // Download Quiz as PDF
  const downloadQuizPdfHandler = (answers) => {
    if (questions.length === 0) {
      dispatch(setAlert({ type: "Danger", message: "Atleast Add A Question" }));
      return;
    }
    dispatch(setLoading(true));
    if (answers) {
      const questionActions =
        document.getElementsByClassName("questionActions");
      for (let i = 0; i < questionActions.length; i++) {
        const element = questionActions[i];
        element.classList.add("d-none");
      }
      downloadQuizPdf(true);
    } else {
      setEdit({ value: false, type: "pdf" });
    }
  };
  const downloadQuizPdf = async (answers) => {
    var doc = new jsPDF("l", "pt", "a4");
    const questions = Array.of(...document.getElementsByClassName("question"));
    questions.map((question, i) => {
      html2canvas(question).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        doc.setPage(i);
        doc.addPage([imgWidth, imgHeight]);
        doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, null, "NONE");
        if (i == questions.length - 1) {
          if (!answers) {
            setEdit({ value: true, type: "none" });
          } else {
          }
          const questionActions =
            document.getElementsByClassName("questionActions");
          for (let i = 0; i < questionActions.length; i++) {
            const element = questionActions[i];
            element.classList.remove("d-none");
          }
          doc.deletePage(1);
          doc.save(`${quizcode}-Questions${answers ? "-Answers" : ""}`);
          dispatch(setLoading(false));
        }
      });
    });
  };

  const downloadQuizOptions = [
    ["Image - Questions", () => downloadImageHandler(false)],
    ["Image - Questions + Answers", () => downloadImageHandler(true)],
    ["PDF - Questions", () => downloadQuizPdfHandler(false)],
    ["PDF - Questions - Answers", () => downloadQuizPdfHandler(true)],
  ];

  return (
    <div className="d-flex align-items-center justify-content-center my-3 flex-wrap">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-warning dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Download Quiz
        </button>
        <ul class="dropdown-menu" style={style}>
          {downloadQuizOptions.map((option) => (
            <>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <button onClick={option[1]} class="dropdown-item" style={style}>
                  {option[0]}
                </button>
              </li>
            </>
          ))}
          <li>
            <hr class="dropdown-divider" />
          </li>
        </ul>
      </div>
    </div>
  );
}
