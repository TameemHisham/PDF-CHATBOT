// import React, { useState } from "react";
// import UploadPDF from "./UploadPDF";
// import ProgressBar from "./progress";

// const ChatBot = ({ username }) => {
// 	const [chatHistory, setChatHistory] = useState([]);
// 	const [aiReady, setAiReady] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [summarizeLoad, setSummarizeLoad] = useState(false);
// 	const [recognizedSpeech, setRecognizedSpeech] = useState("");

	
// 	const handleAiResponse = (answer, link="") => {
// 		if (answer) {
// 			setChatHistory((prevChatHistory) => [
// 				...prevChatHistory,
// 				{ user: false, message: answer, link: link },
// 			]);
// 		} else {
// 			setChatHistory((prevChatHistory) => [
// 				...prevChatHistory,
// 				{ user: false, message: "No response from AI." },
// 			]);
// 		}
// 		setLoading(false);
// 	};

// 	const handleVoice = (message) => {
// 		if ("speechSynthesis" in window) {
// 			const utterance = new SpeechSynthesisUtterance(message);
// 			speechSynthesis.speak(utterance);
// 		} else {
// 			alert("Sorry, your browser does not support speech synthesis.");
// 		}
// 	};

// 	const handleVoiceInput = () => {
// 		const recognition = new window.webkitSpeechRecognition();
// 		recognition.lang = "en-US";
// 		recognition.onresult = (event) => {
// 			const transcript = event.results[0][0].transcript;
// 			setRecognizedSpeech(transcript);
// 			document.querySelector('input[name="userInput"]').value = transcript;
// 		};
// 		recognition.start();
// 	};

// 	const sendMessageToAi = (username, question) => {
// 		setLoading(true);
// 		fetch("http://localhost:5000/ask", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ username, question }),
// 		})
// 			.then((response) => {
// 				if (!response.ok) {
// 					throw new Error("Network response was not ok");
// 				}
// 				return response.json();
// 			})
// 			.then((data) => {
// 				setSummarizeLoad(true);
// 				console.log(data.answer[0]["answer"], data.link[0]["link"]);
// 				if (data.answer) {
// 					handleAiResponse(data.answer[0]["answer"], data.link[0]["link"]);
// 				} else {
// 					handleAiResponse(data.message);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error connecting to AI service:", error);
// 				handleAiResponse("Error: Unable to connect to AI service.");
// 			});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const userInput = e.target.userInput.value;
// 		setChatHistory([...chatHistory, { user: true, message: userInput }]);
// 		sendMessageToAi(username, userInput);
// 		e.target.userInput.value = "";
// 	};
// 	const handleSummarize = () => {
//     setSummarizeLoad(true); // Indicates that summarization process is in progress

//     // Fetch summarized data from the backend service
//     fetch("http://localhost:5000/summarize", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json(); // Convert response to JSON format
//     })
//     .then((data) => {
// 			setSummarizeLoad(false); // Indicates that summarization process is complete
// 			console.log(data); // Log the entire response object to see its structure
	
// 			// Check if the response contains a summary
// 			if (data[0].summarized) { // Check if data[0] has the summarized key
// 					handleAiResponse(data[0].summarized); // Pass the summarized text to handleAiResponse function
// 			} else {
// 					handleAiResponse("No summary");
// 			}
// 	})	
//     .catch((error) => {
//         console.error("Error connecting to AI service:", error);
//         handleAiResponse("Error: Unable to connect to AI service.");
//     });
// };



// 	const handleFileUpload = () => {
// 		setAiReady(true);
// 		handleAiResponse("AI is ready. Ask your questions.");
// 	};

// 	return ( <>
// 			{!aiReady && (
// 				<UploadPDF username={username} onFileUpload={handleFileUpload} />
// 				)}
// 			<div className="qa_box">
// 			<div className="scroll-box">
// 				{chatHistory.map((item, index) => (
// 					<p className="ai-response" key={index}>
// 						<strong>
// 							{item.user ? "You" : "Bot"}: {item.message} <br />{" "}
// 							{
//               (!item.user !== "You" && summarizeLoad  ) ? 
//                (
// 								<>
// 								<a target="_blank" href={item.link} rel="noreferrer">
// 									Learn More
// 								</a>
// 								<svg
// 							onClick={() => handleVoice(item.message)}
// 							xmlns="http://www.w3.org/2000/svg"
// 							fill="none"
// 							viewBox="0 0 24 24"
// 							strokeWidth={1.5}
// 							stroke="currentColor"
// 							className="w-6 h-6 speaker"
// 						>
// 							<path
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
// 							/>
// 						</svg>
// 								</>
// 							): ''}
// 						</strong>
						
// 						<br />
// 					</p>
// 				))}
// 			<form onSubmit={handleSubmit}>
// 				<input
// 					type="text"
// 					name="userInput"
// 					placeholder="Type your question..."
// 				/>

// 				<svg
// 					xmlns="http://www.w3.org/2000/svg"
// 					fill="none"
// 					viewBox="0 0 24 24"
// 					strokeWidth={1.5}
// 					onClick={handleVoiceInput}
// 					stroke="currentColor"
// 					className="microphone w-6 h-6"
// 				>
// 					<path
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 						d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
// 					/>
// 				</svg>
// 				<svg
// 					xmlns="http://www.w3.org/2000/svg"
// 					fill="none"
// 					viewBox="0 0 24 24"
// 					strokeWidth={1.5}
// 					stroke="currentColor"
// 					onClick={handleSummarize}
// 					className="summarize w-6 h-6"
// 				>
// 					<path
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 						d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
// 					/>
// 				</svg>

// 				<button type="submit">Send</button>
// 			</form>
// 			{loading && <ProgressBar percent={50} />}
// 			</div>

// 			</div>			
// 		</>
// 	);
// };

// export default ChatBot;
import React, { useEffect, useRef, useState } from "react";
import UploadPDF from "./UploadPDF";
import ProgressBar from "./progress";

const ChatBot = ({ username }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [aiReady, setAiReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summarizeLoad, setSummarizeLoad] = useState(false);
    const [recognizedSpeech, setRecognizedSpeech] = useState("");
    const scrollBoxRef = useRef(null);

    const handleAiResponse = (answer, link = "") => {
        if (answer) {
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { user: false, message: answer, link: link },
            ]);
        } else {
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { user: false, message: "No response from AI." },
            ]);
        }
        setLoading(false);
    };

    const handleVoice = (message) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support speech synthesis.");
        }
    };

    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setRecognizedSpeech(transcript);
            document.querySelector('input[name="userInput"]').value = transcript;
        };
        recognition.start();
    };

    const sendMessageToAi = (username, question) => {
        setLoading(true);
        fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, question }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSummarizeLoad(true);
                console.log(data.answer[0]["answer"], data.link[0]["link"]);
                if (data.answer) {
                    handleAiResponse(data.answer[0]["answer"], data.link[0]["link"]);
                } else {
                    handleAiResponse(data.message);
                }
            })
            .catch((error) => {
                console.error("Error connecting to AI service:", error);
                handleAiResponse("Error: Unable to connect to AI service.");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = e.target.userInput.value;
        setChatHistory([...chatHistory, { user: true, message: userInput }]);
        sendMessageToAi(username, userInput);
        e.target.userInput.value = "";
    };

    const handleSummarize = () => {
        setSummarizeLoad(true);
        // Fetch summarized data from the backend service
        fetch("http://localhost:5000/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Convert response to JSON format
            })
            .then((data) => {
                setSummarizeLoad(false); // Indicates that summarization process is complete
                console.log(data); // Log the entire response object to see its structure

                // Check if the response contains a summary
                if (data[0].summarized) {
                    // Check if data[0] has the summarized key
                    handleAiResponse(data[0].summarized); // Pass the summarized text to handleAiResponse function
                } else {
                    handleAiResponse("No summary");
                }
            })
            .catch((error) => {
                console.error("Error connecting to AI service:", error);
                handleAiResponse("Error: Unable to connect to AI service.");
            });
    };

    const handleFileUpload = () => {
        setAiReady(true);
        handleAiResponse("AI is ready. Ask your questions.");
    };

    useEffect(() => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <>
            {!aiReady && <UploadPDF username={username} onFileUpload={handleFileUpload} />}
            <div className="qa_box">
                <div className="scroll-box" ref={scrollBoxRef}>
                    {chatHistory.map((item, index) => (
                        <p className="ai-response" key={index}>
                            <strong>
                                {item.user ? "You" : "Bot"}: {item.message} <br />{" "}
                                {item.link && summarizeLoad ? (
                                    <>
                                        <a target="_blank" href={item.link} rel="noreferrer">
                                            Learn More
                                        </a>
                                        <svg
                                            onClick={() => handleVoice(item.message)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 speaker"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                            />
                                        </svg>
                                    </>
                                ) : (
                                    ""
                                )}
                            </strong>

                            <br />
                        </p>
                    ))}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="userInput"
                            placeholder="Type your question..."
                        />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            onClick={handleVoiceInput}
                            stroke="currentColor"
                            className="microphone w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={handleSummarize}
                            className="summarize w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                            />
                        </svg>

                        <button type="submit">Send</button>
                    </form>
                    {loading && <ProgressBar percent={50} />}
                </div>
            </div>
        </>
    );
};

export default ChatBot;
