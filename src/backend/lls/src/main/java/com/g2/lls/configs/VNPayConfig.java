package com.g2.lls.configs;

import com.g2.lls.utils.VNPayUtil;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.*;

@Configuration
public class VNPayConfig {
    @Getter
    @Value("${vnPay.vnp_Url}")
    private String vnp_PayUrl;
    @Value("${vnPay.vnp_ReturnUrl}")
    private String vnp_ReturnUrl;
    @Value("${vnPay.vnp_TmnCode}")
    private String vnp_TmnCode ;
    @Getter
    @Value("${vnPay.vnp_HashSecret}")
    private String secretKey;
    @Value("${vnPay.vnp_Version}")
    private String vnp_Version;
    @Value("${vnPay.vnp_Command}")
    private String vnp_Command;
    @Value("${vnPay.vnp_OrderType}")
    private String orderType;
    @Value("${vnPay.vnp_CurrCode}")
    private String vnp_CurrCode;
    @Value("${vnPay.vnp_Locale}")
    private String vnp_Locale;

    public Map<String, String> getVNPayConfig() {
        Map<String, String> vnpParamsMap = new HashMap<>();
        vnpParamsMap.put("vnp_Version", this.vnp_Version);
        vnpParamsMap.put("vnp_Command", this.vnp_Command);
        vnpParamsMap.put("vnp_TmnCode", this.vnp_TmnCode);
        vnpParamsMap.put("vnp_CurrCode", this.vnp_CurrCode);
        vnpParamsMap.put("vnp_TxnRef",  VNPayUtil.getRandomNumber(8));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang:" +  VNPayUtil.getRandomNumber(8));
        vnpParamsMap.put("vnp_OrderType", this.orderType);
        vnpParamsMap.put("vnp_Locale", this.vnp_Locale);
        vnpParamsMap.put("vnp_ReturnUrl", this.vnp_ReturnUrl);
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnpCreateDate = formatter.format(calendar.getTime());
        vnpParamsMap.put("vnp_CreateDate", vnpCreateDate);
        calendar.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(calendar.getTime());
        vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);

        return vnpParamsMap;
    }
}
