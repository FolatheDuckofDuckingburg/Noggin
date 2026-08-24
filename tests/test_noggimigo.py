import unittest
import sys
import os
import asyncio
import json

# Ensure project root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from noggimigo.Noggimigo import NoggimigoTutorEngine, NFOTEngine, SocraticReasoningCore
from noggimigo.NoggimigoIntent import NoggimigoIntentAI
from noggimigo.LessonGenerator import LessonGenerator, DisabilityScaffoldAdapter
from python.processor import calculate_focus_score, NeuralSignalProcessor
from python.generator import generate_brain_waves, TelemetryDataPipeline


class TestNoggimigoIntentAI(unittest.TestCase):
    def setUp(self):
        self.intent_ai = NoggimigoIntentAI()

    def test_semantic_intent_matching(self):
        res1 = self.intent_ai.predict_intent("I guess it is a quarter")
        self.assertEqual(res1["intent"], "1/4")

        res2 = self.intent_ai.predict_intent("give me a hint please")
        self.assertEqual(res2["intent"], "hint")

        res3 = self.intent_ai.predict_intent("subtract four from both sides")
        self.assertEqual(res3["intent"], "subtract 4")

        res_unknown = self.intent_ai.predict_intent("random unrelated words")
        self.assertIsNone(res_unknown["intent"])


class TestNFOTEngine(unittest.TestCase):
    def setUp(self):
        self.nfot = NFOTEngine(c=1500.0)

    def test_efficiency_decay(self):
        eff_low_lat = self.nfot.calculate_efficiency(40.0)
        eff_high_lat = self.nfot.calculate_efficiency(200.0)
        self.assertGreater(eff_low_lat, eff_high_lat)
        self.assertAlmostEqual(self.nfot.calculate_efficiency(0.0), 1.0)

    def test_abeth_bias(self):
        bias_p = self.nfot.calculate_abeth_bias(30.0)
        bias_d = self.nfot.calculate_abeth_bias(150.0)
        self.assertEqual(bias_p, "POTENTIATION_FAVORED")
        self.assertEqual(bias_d, "DEPRESSIVE_BIAS")

    def test_learning_outcome_prediction(self):
        telemetry = self.nfot.process_telemetry(40.0, {"theta": 4.0, "beta": 16.0, "alpha": 12.0})
        pred = telemetry["learning_prediction"]
        self.assertIn("predicted_retention_score", pred)
        self.assertEqual(pred["readiness_zone"], "OPTIMAL_MASTERY_ZONE")


class TestSocraticReasoningCore(unittest.TestCase):
    def setUp(self):
        self.core = SocraticReasoningCore()

    def test_correct_fraction_parsing(self):
        res = self.core.evaluate_student_input("fractions_intro", "step_1", "1/4")
        self.assertEqual(res["status"], "CORRECT")
        self.assertEqual(res["next_node"], "step_2")

    def test_misconception_classification(self):
        res = self.core.evaluate_student_input("fractions_intro", "step_1", "3/4")
        self.assertEqual(res["status"], "MISCONCEPTION")
        self.assertEqual(res["error_type"], "INVERSION_ERROR")

    def test_hint_request(self):
        res = self.core.evaluate_student_input("fractions_intro", "step_1", "I need a hint please")
        self.assertEqual(res["status"], "HINT_REQUESTED")


class TestNoggimigoTutorEngine(unittest.TestCase):
    def setUp(self):
        self.tutor = NoggimigoTutorEngine(active_concept="fractions_intro")

    def test_closed_loop_evaluation(self):
        res = self.tutor.evaluate_response("1/4", latency_ms=35.0, brain_data={"theta": 5.0, "beta": 15.0})
        self.assertEqual(res["status"], "CORRECT")
        self.assertEqual(res["nfot_telemetry"]["cognitive_state"], "HIGH_FOCUS")
        self.assertEqual(res["node"], "step_2")

    def test_attention_decay_neuroadaptation(self):
        res = self.tutor.evaluate_response("3/4", latency_ms=180.0, brain_data={"theta": 15.0, "beta": 3.0})
        self.assertEqual(res["status"], "MISCONCEPTION")
        self.assertIn("NFOT Adaptive Boost", res["feedback"])
        self.assertEqual(res["nfot_telemetry"]["cognitive_state"], "ATTENTION_DECAY")


class TestLessonGenerator(unittest.TestCase):
    def setUp(self):
        self.gen = LessonGenerator()

    def test_procedural_generation(self):
        lesson = self.gen.generate_procedural_lesson("math_fractions", disability_profile="adhd")
        self.assertEqual(lesson["disability_profile"], "adhd")
        self.assertIn("step_1", lesson["nodes"])
        self.assertTrue(lesson["accommodations"]["visual_cues"])

    def test_disability_adapter(self):
        prompt = DisabilityScaffoldAdapter.adapt_prompt("Solve 2x + 4 = 10", "autism")
        self.assertIn("Step-by-Step Guide", prompt)


class TestProcessorMetrics(unittest.TestCase):
    def setUp(self):
        self.proc = NeuralSignalProcessor()

    def test_focus_score(self):
        score = calculate_focus_score({"theta": 10.0, "beta": 2.0})
        self.assertEqual(score["tbr"], 5.0)
        self.assertEqual(score["state"], "ATTENTION_DECAY")

    def test_polling_optimization(self):
        interval = self.proc.optimize_polling_interval(alpha_power=15.0, beta_power=5.0)
        self.assertLess(interval, 800.0)


class TestTelemetryDataPipeline(unittest.TestCase):
    def setUp(self):
        self.pipeline = TelemetryDataPipeline(log_dir="test_telemetry_logs")

    def test_validation_and_logging(self):
        valid_bd = generate_brain_waves("synthetic")
        is_valid = self.pipeline.validate_telemetry(valid_bd)
        self.assertTrue(is_valid)

        rec = self.pipeline.record_event(valid_bd, {"efficiency": 0.95}, "testing")
        self.assertEqual(len(self.pipeline.buffer), 1)

        json_path = self.pipeline.export_json()
        csv_path = self.pipeline.export_csv()
        self.assertTrue(os.path.exists(json_path))
        self.assertTrue(os.path.exists(csv_path))

        # Cleanup test files
        if os.path.exists(json_path):
            os.remove(json_path)
        if os.path.exists(csv_path):
            os.remove(csv_path)


if __name__ == "__main__":
    unittest.main()
