import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import Patient from "../../src/assets/dropdown/patient.png";
import Doctor from "../../src/assets/dropdown/doctor.png";
import noData from "../../src/assets/No-data.png";
import { useQuery } from "react-query";
import { API } from "../../src/config/api";
import moment from "moment";
import { UserContext } from "../context/userContex";

export default function Inbox() {
    const title = "List Consultation";
    document.title = "HelloCorona | " + title;

    const [state, dispatch] = useContext(UserContext)

    let { data: consultations } = useQuery("cacheConsultations", async () => {
        const response = await API.get("/consultations");
        return response.data.data;
    });

    // console.log("aa", consultations.user);
    // console.log("bb", state.user.id);
    


    return (
        <>
            {consultations?.length != 0 ? (
                <div>
                    <div
                        className="container p-5"
                        style={{ marginTop: "10vh", marginRight: "50px" }}
                    >
                        <h2 style={{ color: "#FF6185", fontWeight: "700", marginLeft: "250px"}}>
                            Consultation
                        </h2>
                    </div>
                    {consultations?.map((item, index) => (
                        item?.user_id === state?.user?.id?
                        <Card className="container p-3 mb-3" key={index}>
                            <Card.Body>
                                <div className="inbox-ctnr">
                                    <div className="inbox-left">
                                        <img
                                            className="rounded-circle"
                                            src={Patient}
                                            alt="Patient"
                                            style={{border: "3px solid #ff6185", width: "60px", height:"60px", objectFit:"cover" }}
                                        />
                                    </div>
                                    <div className="inbox-right">
                                        <h4 style={{ fontWeight: "700" }}>{item?.subject}</h4>
                                        <small className="text-muted">
                                            Last update:{" "}
                                            {moment(item?.updatedAt).format("DD MMMM YYYY")}
                                        </small>
                                        <div className="mt-1 ms-4 cons-box">Keluhan: {item?.desc}</div>
                                    </div>
                                    <div className="ms-3 d-block">
                                        <small style={{ fontWeight: "700" }}>
                                            {moment(item?.createdAt).format("DD MMMM YYYY")}
                                        </small>
                                        <p style={{ color: "#ff6185", fontWeight: "700" }}>
                                            {item?.user?.username}
                                        </p>
                                    </div>
                                </div>
                            </Card.Body>
                            {item?.reply == "" ? (
                                <Card.Footer className="text-muted">
                                    <div className="d-flex justify-content-center align-items-center p-4">
                                        <h4 style={{ fontWeight: "700" }}>Waiting For Reply</h4>
                                    </div>
                                </Card.Footer>
                            ) : (
                                <Card.Footer className="d-flex justify-content-center align-items-center">
                                    <div className="footctn">
                                        <div className="inboxfoot-left">
                                            <img
                                                className="rounded-circle"
                                                src={Doctor}
                                                alt="Doctor"
                                                style={{ width: "60px", height:"60px", objectFit:"cover", border: "3px solid #ff6185" }}
                                            />
                                        </div>
                                        <div className="inboxfoot-right mt-3">
                                            {item?.reply}
                                            <a
                                                href={`${item?.linkLive}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="ms-2"
                                            >
                                                Here
                                            </a>
                                            <p className="mt-2">Dr. Surya Ganteng</p>
                                        </div>
                                    </div>
                                </Card.Footer>
                            )}
                        </Card>
                        :<div></div>
                    ))}
                </div>
            ) : (
                <div>
                    <div
                        className="container p-5"
                        style={{ marginTop: "10vh", marginRight: "50px" }}
                    >
                        <h2 style={{ color: "#FF6185", fontWeight: "700" }}>
                            Consultation
                        </h2>
                    </div>
                    <div className="text-center">
                        <img
                            src={noData}
                            alt=""
                            className="img-fluid"
                            style={{ width: "30%" }}
                        />
                        <div className="mb-3">No data consultations</div>
                    </div>
                </div>
            )}
        </>
    );
}
