import React, { ChangeEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../assets/journal.css";

interface JournalInfo {
  entry: string;
}
export default function Journal() {
  const [journalEntry, setJournalEntry] = useState({
    entry: "",
  });

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

  useEffect(() => {
    localStorage.setItem("submittedJournal", JSON.stringify(submittedJournal));
  }, [submittedJournal]);

  const handleJournalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJournalEntry({ ...journalEntry, [name]: value });
  };

  const handleJournalSubmit = () => {
    setSubmittedJournal([...submittedJournal, journalEntry]);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          className="journalInput"
          type="text"
          onChange={(e) => handleJournalChange(e)}
          value={journalEntry.entry || ""}
          name="entry"
        />
      </InputGroup>
      <button onClick={() => handleJournalSubmit()}>Save</button>
      <div>
        {submittedJournal.map((submittedEntry, index) => (
          <div key={index}>
            <p>{submittedEntry.entry}</p>
            <button onClick={() => handleDeleteEntry(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
