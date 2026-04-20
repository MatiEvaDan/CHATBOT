import * as ort from "onnxruntime-react-native";

let session: ort.InferenceSession | null = null;

// Load ML model
export const loadModel = async () => {
  try {
    session = await ort.InferenceSession.create(
      require("../assets/models/intent_model.onnx")
    );

    console.log("Model loaded");
    console.log("Inputs:", session.inputNames);
    console.log("Outputs:", session.outputNames);
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

// Send text to ML model
export const predictIntent = async (text: string) => {
  if (!session) {
    console.log("Model not loaded yet");
    return null;
  }

  try {
    const inputName = session.inputNames[0];
    const outputName = session.outputNames[0];

    const tensor = new ort.Tensor("string", [text], [1]);

    const results = await session.run({
      [inputName]: tensor,
    });

    console.log("RAW RESULT:", results);
    console.log("OUTPUT:", results[outputName]);
    console.log("DATA:", results[outputName]?.data);

    return results[outputName];
  } catch (error) {
    console.error("Prediction error:", error);
    return null;
  }
};