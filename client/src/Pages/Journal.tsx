import React, { ChangeEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../assets/journal.css";

interface JournalInfo {
  entry: string;
  date: string;
}
export default function Journal() {
  const [journalEntry, setJournalEntry] = useState({
    entry: "",
    date: "",
  });
  const [openJournalEntries, setOpenJournalEntries] = useState<boolean>(false);
  const [viewEntry, setViewEntry] = useState<number>();

  const [submittedJournal, setSubmittedJournal] = useState<JournalInfo[]>(
    () => {
      const savedDate = localStorage.getItem("submittedJournal");
      return savedDate ? JSON.parse(savedDate) : [];
    }
  );

  const handleDeleteEntry = (index: number) => {
    const updateJournal = [...submittedJournal];
    updateJournal.splice(index, 1);
    setSubmittedJournal(updateJournal);
  };

  const handleViewEntry = (index: number) => {
    submittedJournal.map((entry, i) => (i === index ? entry : null));
  };

  useEffect(() => {
    localStorage.setItem("submittedJournal", JSON.stringify(submittedJournal));
  }, [submittedJournal]);

  const handleJournalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJournalEntry({ ...journalEntry, [name]: value });
  };

  const handleJournalSubmit = () => {
    setSubmittedJournal([...submittedJournal, journalEntry]);
    setJournalEntry({ entry: "", date: "" });
  };

  const handleOpenJournalEntries = () => {
    setOpenJournalEntries(!openJournalEntries);
  };

  return (
    <div className="journalContainer">
      <div className="windowHeader">Journal</div>
      <div className="windowBody">
        <InputGroup className="mb-3">
          <textarea
            className="journalInput"
            onChange={handleJournalChange}
            value={journalEntry.entry}
            name="entry"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <input
            type="date"
            className="dateInput"
            onChange={handleJournalChange}
            value={journalEntry.date}
            name="date"
          />
        </InputGroup>
        <button onClick={handleJournalSubmit}>Save</button>
        <button onClick={handleOpenJournalEntries}>
          {openJournalEntries ? "Close" : "View Entries"}
        </button>

        {openJournalEntries && (
          <div>
            {submittedJournal.map((submittedEntry, index) => (
              <div key={index} className="entryContainer">
                <button onClick={handleViewEntry}>View Entry</button>
                {viewEntry ? (
                  <div>
                    <p>
                      <strong>{submittedEntry.date}</strong>
                    </p>
                    <p>{submittedEntry.entry}</p>
                    <button onClick={() => handleDeleteEntry(index)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  <p>{submittedEntry.entry}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
