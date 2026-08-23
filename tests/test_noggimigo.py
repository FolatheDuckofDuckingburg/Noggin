import unittest
import sys
import os

# Ensure project root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from noggimigo.Noggimigo import NoggimigoTutorEngine, NFOTEngine, SocraticReasoningCore
from python.processor import calculate_focus_score, NeuralSignalProcessor


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


class TestProcessorMetrics(unittest.TestCase):
    def test_focus_score(self):
        score = calculate_focus_score({"theta": 10.0, "beta": 2.0})
        self.assertEqual(score["tbr"], 5.0)
        self.assertEqual(score["state"], "ATTENTION_DECAY")


if __name__ == "__main__":
    unittest.main()
