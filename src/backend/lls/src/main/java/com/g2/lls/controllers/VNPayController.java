package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.VNPayResDTO;
import com.g2.lls.services.VNPayService;
import com.g2.lls.utils.TimeUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("${api.v1}/payments")
@RequiredArgsConstructor
public class VNPayController {
    private final VNPayService vnpayService;

    @Value("${react.base-url}")
    private String reactBaseUrl;

    @GetMapping("/vn-pay")
    public ResponseEntity<ApiResponse<VNPayResDTO>> pay(HttpServletRequest request,
                                                        @RequestParam("amount") String amount,
                                                        @RequestParam("bankCode") String bankCode) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                vnpayService.createVNPayPayment(request), TimeUtil.getTime()));
    }

    //    @GetMapping("/vn-pay/callback")
//    public ResponseEntity<ApiResponse<VNPayResDTO>> payCallbackHandler(HttpServletRequest request) {
//        String status = request.getParameter("vnp_ResponseCode");
//        if (status.equals("00")) {
//            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
//                    VNPayResDTO.builder().url("http://localhost:3000").build(), TimeUtil.getTime()));
//        } else {
//            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), false,
//                    VNPayResDTO.builder().url("http://localhost:3000").build(), TimeUtil.getTime()));
//        }
//    }
    @GetMapping("/vn-pay/callback")
    public ResponseEntity<Void> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        String orderId = request.getParameter("vnp_TxnRef");

        if (status.equals("00")) {
            String reactAppUrl = String.format("%s/payment-success", reactBaseUrl);
            String redirectUrl = reactAppUrl + "?status=" + status + "&orderId=" + orderId;

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(redirectUrl));

            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } else {
            String reactAppUrl = String.format("%s/payment-fail", reactBaseUrl);

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(reactAppUrl));

            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
    }
}
