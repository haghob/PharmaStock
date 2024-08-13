package com.example.pharmainventory.controller;

import com.example.pharmainventory.model.Medicine;
import com.example.pharmainventory.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() -> new RuntimeException("Medicine not found"));
        return ResponseEntity.ok(medicine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicineDetails) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setName(medicineDetails.getName());
        medicine.setQuantity(medicineDetails.getQuantity());
        medicine.setPrice(medicineDetails.getPrice());

        final Medicine updatedMedicine = medicineRepository.save(medicine);
        return ResponseEntity.ok(updatedMedicine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() -> new RuntimeException("Medicine not found"));
        medicineRepository.delete(medicine);
        return ResponseEntity.noContent().build();
    }
}
