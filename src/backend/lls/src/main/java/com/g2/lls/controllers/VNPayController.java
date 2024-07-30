package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.VNPayResDTO;
import com.g2.lls.services.VNPayService;
import com.g2.lls.utils.TimeUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.v1}/payments")
@RequiredArgsConstructor
public class VNPayController {
    private final VNPayService vnpayService;

    @GetMapping("/vn-pay")
    public ResponseEntity<ApiResponse<VNPayResDTO>> pay(HttpServletRequest request,
                                                        @RequestParam("amount") String amount,
                                                        @RequestParam("bankCode") String bankCode) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                vnpayService.createVNPayPayment(request), TimeUtil.getTime()));
    }

    @GetMapping("/vn-pay/callback")
    public ResponseEntity<ApiResponse<VNPayResDTO>> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                    VNPayResDTO.builder().url("").build(), TimeUtil.getTime()));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), false,
                    VNPayResDTO.builder().url("").build(), TimeUtil.getTime()));
        }
    }
}
