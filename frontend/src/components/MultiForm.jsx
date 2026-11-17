import { useState } from "react";

export default function MultiForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
    });

    return (
        <div>
            {step === 1 && (
                <div>
                    <h2>Step 1: Personal Information</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Step 2: Contact Information</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            )}
            {step === 3 && (
                <div>
                    <h2>Step 3: Address</h2>
                    <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
            )}
            <div>
                {step > 1 && <button onClick={() => setStep(step - 1)}>Previous</button>}
                {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
                {step === 3 && <button onClick={() => console.log(formData)}>Submit</button>}
            </div>
        </div>
    );
}
