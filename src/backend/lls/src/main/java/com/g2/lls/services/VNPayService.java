package com.g2.lls.services;

import com.g2.lls.dtos.response.VNPayResDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface VNPayService {
    VNPayResDTO createVNPayPayment(HttpServletRequest request);
}
