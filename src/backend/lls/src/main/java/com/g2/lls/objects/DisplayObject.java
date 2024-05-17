package com.g2.lls.objects;

import lombok.*;

import java.lang.reflect.Field;
import java.util.LinkedHashMap;
import java.util.List;

@Getter
@Setter
@ToString
public class DisplayObject<T> {
    LinkedHashMap<String, Object> data;

    public DisplayObject() {
        data = new LinkedHashMap<>();
    }

    public void displayData(T dto) {
        for (Field field : dto.getClass().getDeclaredFields()) {
            try {
                field.setAccessible(true);
                data.put(field.getName(), field.get(dto));
            } catch (Exception e) {
                throw new RuntimeException("Error inserting data: " + e.getMessage());
            }
        }
    }

    public void displayListData(T dto, List<String> keys) {
        for (String key : keys) {
            try {
                Object value = dto.getClass().getMethod("get" + key.substring(0, 1).toUpperCase() + key.substring(1)).invoke(dto);
                data.put(key, value);
            } catch (Exception e) {
                throw new RuntimeException("Error inserting data: " + e.getMessage());
            }
        }
    }

    public void displayWithExternalData(T dto, LinkedHashMap<String, Object> externalData) {
        for (Field field : dto.getClass().getDeclaredFields()) {
            try {
                field.setAccessible(true);
                data.put(field.getName(), field.get(dto));
            } catch (Exception e) {
                throw new RuntimeException("Error inserting data: " + e.getMessage());
            }
        }
        data.putAll(externalData);
    }

    public void displayListWithExternalData(T dto, List<String> keys, LinkedHashMap<String, Object> externalData) {
        for (String key : keys) {
            try {
                Object value = dto.getClass().getMethod("get" + key.substring(0, 1).toUpperCase() + key.substring(1)).invoke(dto);
                data.put(key, value);
            } catch (Exception e) {
                throw new RuntimeException("Error inserting data: " + e.getMessage());
            }
        }
        data.putAll(externalData);
    }
}
