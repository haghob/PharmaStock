package com.example.pharmainventory.model;

import javax.persistence.*;

@Entity
public class PurchaseOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseOrderItemID;

    @ManyToOne
    @JoinColumn(name = "purchaseOrderID", nullable = false)
    private PurchaseOrder purchaseOrder;

    @ManyToOne
    @JoinColumn(name = "medicineID", nullable = false)
    private Medicine medicine;

    private Integer quantity;

    private Double priceAtPurchase;

    // Getters and Setters
    public Long getPurchaseOrderItemID() {
        return purchaseOrderItemID;
    }

    public void setPurchaseOrderItemID(Long purchaseOrderItemID) {
        this.purchaseOrderItemID = purchaseOrderItemID;
    }

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPriceAtPurchase() {
        return priceAtPurchase;
    }

    public void setPriceAtPurchase(Double priceAtPurchase) {
        this.priceAtPurchase = priceAtPurchase;
    }
}
