import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Flag />
    </QueryClientProvider>
  );
}


function Flag() {
  const parser = new DOMParser();

  //
  // URL: https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/637261
  //
  // Script to get the flag URL
  //
  // const { data: flagLink } = useQuery({
  //   queryKey: ["urlData"],
  //   queryFn: () =>
  //     fetch(
  //       "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
  //     )
  //       .then((response) => {
  //         return response.text();
  //       })
  //       .then((data) => {
  //         const parsedDocument = parser.parseFromString(data, "text/html");

  //         let flagUrl = [];

  //         const codes = parsedDocument.getElementsByTagName(`code`);
  //         Array.from(codes).filter((code) => {
  //           // console.log(code.childNodes);
  //           // get the code element children and get the divs
  //           const codeChildren = Array.from(code.childNodes);
  //           codeChildren.filter((codeChild) => {
  //             if(codeChild.nodeName === 'DIV') {
  //               // get the div element children and get the spans
  //               const divChildren = Array.from(codeChild.childNodes);
  //               divChildren.filter((divChild) => {
  //                 if(divChild.nodeName === 'SPAN') {
  //                   const spanChildren = Array.from(divChild.childNodes);
  //                   spanChildren.filter((spanChild) => {
  //                     if(spanChild.nodeName === 'I') {
  //                       flagUrl.push(spanChild.getAttribute('value'));
  //                     }
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         });
          
  //         console.log(flagUrl.join(''));
  //         return flagUrl.join('');
  //       })
  // });
  // --

  const flagUrl = 'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/637261';

  const getTheFlag = async () => {
    return await fetch(flagUrl)
      .then((response) => response.text())
      .then((data) => {
        const parsedDocument = parser.parseFromString(data, "text/html");
        return parsedDocument.getElementsByTagName('body')[0].innerText;
      });
  };

  const {data, error, isLoading} = useQuery(['theFlag'], () => getTheFlag());

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <TypeWriterEffect textData={data} delay={500} />
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

const TypeWriterEffect = ({ textData, delay }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
  if (index < textData.length) {
    const timeout = setTimeout(() => {
      setText(prevText => prevText + textData[index]);
      setIndex(prevIndex => prevIndex + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }
}, [index, delay, textData]);

  return <ul style={{ textAlign: 'center', fontSize: '45px', margin: '0 auto', width: '50px' }}>{text.split('').map((item) => <li>{item}</li>)}</ul>;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
